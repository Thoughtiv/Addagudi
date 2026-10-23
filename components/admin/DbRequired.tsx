/** Shown instead of an admin screen when no database is configured. */
export function DbRequired() {
  return (
    <div className="a-msg a-msg--err" role="alert">
      <strong>MongoDB is not connected.</strong> Set <code>MONGODB_URI</code> in <code>.env.local</code> and restart the server. See the README.
    </div>
  );
}
