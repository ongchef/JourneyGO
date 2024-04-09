export default function AllSpots(props) {
  const {groupId, day} = props;

  return (
    <div>
      <p>groupId: {groupId}</p>
      <p>day: {day+1}</p>
    </div>
  );
}