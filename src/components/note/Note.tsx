const Note = ({ note }: { note: number }) => {
  const roundedNote = note.toFixed(2);

  let colorClass = '';
  if (note >= 0 && note < 4) {
    colorClass = 'bg-red-400';
  } else if (note >= 4 && note < 7) {
    colorClass = 'bg-yellow-400';
  } else {
    colorClass = 'bg-green-400';
  }

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center p-2 text-white ${colorClass}`}
    >
      <p className="text-center">{roundedNote}</p>
    </div>
  );
};

export default Note;
