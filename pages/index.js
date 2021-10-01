import { Fragment } from "react";
import Head from "next/head";
import { connectToDatabase } from "../lib/mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const meetups = await db.collection("meetups").find({}).toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //this revalidates this whole page after 10s(as mentioned) if data it loads is supposed to change by that time.
  };
}

export default HomePage;
