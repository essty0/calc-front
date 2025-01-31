import React from "react";
import ReactModal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        padding: "24px",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "700px",
        width: "100%",
        maxHeight: "95vh",
        borderRadius: "24px",
        boxShadow:
            "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important",
    },
};

interface AppModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const AppModal: React.FC<AppModalProps> = ({ children, isOpen, onClose }) => {
    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="App Modal"
        >
            <div>
                <div className="text-right">
                    <button
                        onClick={() => onClose()}
                        className="rounded-full border-0"
                    >
                        close
                    </button>
                </div>
                <div
                    className="mt-4"
                >
                    {children}
                </div>
            </div>
        </ReactModal>
    );
};

export default AppModal;
