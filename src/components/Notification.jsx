
// const Notification = ({ open, message, severity, onClose }) => {
// 	const [backgroundColor, setBackgroundColor] = useState("");

// 	useEffect(() => {
// 		if (severity === "success") {
// 			setBackgroundColor("green");
// 		} else if (severity === "error") {
// 			setBackgroundColor("red");
// 		}
// 	}, [severity]);

// 	return (
// 		<Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
// 			<Alert
// 				onClose={onClose}
// 				severity={severity}
// 				sx={{ backgroundColor, color: "white" }}
// 			>
// 				{message}
// 			</Alert>
// 		</Snackbar>
// 	);
// };


// export default Notification;