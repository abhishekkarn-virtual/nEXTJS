import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { connectToDatabase } from "../../lib/mongodb";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;
  const { db } = await connectToDatabase();
  console.log(ObjectId(meetupId));
  const selectedMeetup = await db
    .collection("meetups")
    .findOne({ _id: ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
