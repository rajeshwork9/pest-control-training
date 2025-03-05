import React, { useEffect } from "react";


declare global {
    interface Window {
      $: any;
      Checkout: any;
    }
  }
const ModalComponent: React.FC = () => {
    useEffect(() => {
        if (window.Checkout) {
            window.Checkout.configure({
                session: {
                    id: "SESSION0002462179501K2404458I00", // Replace with actual session ID
                },
            });
        }

        $("#exampleModal").on("shown.bs.modal", () => {
            if (window.Checkout) {
                window.Checkout.showEmbeddedPage("#hco-embedded", () => {
                    $("#exampleModal").modal("show"); // Fix: Ensure TypeScript recognizes this method
                });
            }
        });

        $("#exampleModal").on("hide.bs.modal", () => {
            sessionStorage.clear();
        });
    }, []);

    return (
        <>
            {/* Button to open modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                Launch demo modal
            </button>

            {/* Bootstrap Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Modal title
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="hco-embedded"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalComponent;
