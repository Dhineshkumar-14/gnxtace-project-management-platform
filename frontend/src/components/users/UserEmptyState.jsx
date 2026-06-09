function UserEmptyState() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white py-20 text-center">
      <h3 className="text-base font-semibold text-slate-900">No users found</h3>

      <p className="mt-2 text-sm text-slate-500">
        Try adjusting your filters or invite a new user.
      </p>
    </div>
  );
}

export default UserEmptyState;
