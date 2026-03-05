import './ReactFooter.css';

const REACT_LOGO_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPGNpcmNsZSByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjFkYWZiIj4KICAgIDxlbGxpcHNlIHJ4PSIxMSIgcnk9IjQuMiIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSg2MCkiLz4KICAgIDxlbGxpcHNlIHJ4PSIxMSIgcnk9IjQuMiIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwKSIvPgogIDwvZz4KPC9zdmc+`;

function ReactFooter() {
  return (
    <footer className="react-footer">
      <img width="50" alt="React Logo" src={REACT_LOGO_SVG} />
    </footer>
  );
}

export default ReactFooter;
