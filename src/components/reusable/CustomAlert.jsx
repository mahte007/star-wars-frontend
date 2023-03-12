export default function CustomAlert(props) {
    return (
      <div className="alert-box">
        <div className="alert-content">
          <h2>Error</h2>
          <p>{props.message}</p>
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    );
  }