import { Fragment } from "react";
import Head from "next/head";
import { connectToDatabase } from "../lib/mongodb";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Trajansm%C3%A4rkte_Forum.jpg/1280px-Trajansm%C3%A4rkte_Forum.jpg",
    address: " Some address, Some City,234567",
    description: "This is first meetup!",
  },
  {
    id: "m2",
    title: "second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Trajansm%C3%A4rkte_Forum.jpg/1280px-Trajansm%C3%A4rkte_Forum.jpg",
    address: " Some address, Some City,234567",
    description: "This is second meetup!",
  },
  {
    id: "m3",
    title: "third meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Trajansm%C3%A4rkte_Forum.jpg/1280px-Trajansm%C3%A4rkte_Forum.jpg",
    address: " Some address, Some City,234567",
    description: "This is third meetup!",
  },
];

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
