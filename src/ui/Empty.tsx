type EmptyProps = {
  resource: string;
};

const Empty = ({ resource }: EmptyProps) => (
  <p>No {resource} could be found.</p>
);

export default Empty;
