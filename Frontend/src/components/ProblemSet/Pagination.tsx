const Pagination = () => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          {n}
        </button>
      ))}
    </div>
  );
};

export default Pagination;