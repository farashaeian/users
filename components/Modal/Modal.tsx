import { UserInfo } from "@/types";

interface ModalProps {
    user: UserInfo | null;
    onClose: () => void;
  }
  
  const Modal: React.FC<ModalProps> = ({ user, onClose }) => {
    if (!user) return null; // If no user is provided, don't render the modal
  
    return (
      <div className="modal-bg">
        <div className="modal-container">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
          <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="rounded mb-4 w-24 h-24 mx-auto" />
          <h2 className="text-lg font-bold text-center">{user.first_name} {user.last_name}</h2>
          <p className="text-center text-sm text-gray-700">{user.email}</p>
          <p className="text-center text-sm mt-2">User ID: {user.id}</p>
        </div>
      </div>
    );
  };
  
  export default Modal;
  