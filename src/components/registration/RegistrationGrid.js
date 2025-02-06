import ClassroomCard from "./ClassroomCard";

export default function RegistrationGrid({
  classrooms,
  openModal,
  closeModal,
}) {
  return (
    <div className="classroom-grid">
      {Object.entries(classrooms).map(([room, data]) => (
        <ClassroomCard
          key={room}
          room={room}
          data={data}
          openModal={openModal}
          closeModal={closeModal}
        />
      ))}
    </div>
  );
}
