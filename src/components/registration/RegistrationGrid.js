import ClassroomCard from "./ClassroomCard";

export default function RegistrationGrid({ classrooms,
                                           highlightedRoom,
                                           openModal,
                                           closeModal,
                                           registeredRoom
                                         }) {
  return (
    <div className="classroom-grid">
      {Object.entries(classrooms).map(([room, data]) => (
        <ClassroomCard
          key={room}
          room={room}
          data={data}
          highlighted={room === highlightedRoom}
          openModal={openModal}
          closeModal={closeModal}
          registeredRoom={registeredRoom}
        />
      ))}
    </div>
  );
}
