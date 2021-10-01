import { ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { connectToDatabase } from "../../lib/mongodb";

function MeetupDetails(props) {
  // console.log("MeetupDetails",props);
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
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;
  const { db } = await connectToDatabase();
  // console.log(ObjectId(meetupId));
  const selectedMeetup = await db
    .collection("meetups")
    .findOne({ _id: ObjectId(meetupId) });
    // console.log(selectedMeetup);

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
