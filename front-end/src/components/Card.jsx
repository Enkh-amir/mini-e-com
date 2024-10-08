export const Card = ({ product, handleSubmit }) => {
  const { id, name, description, price, image_url } = product;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img className="object-cover" src={image_url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}!</h2>
        <p>{description}</p>
        <p>${price}</p>
        <div className="card-actions justify-end">
          <button
            className="btn"
            onClick={() =>
              document.getElementById(`my_modal_${product.id}`).showModal()
            }
          >
            More
          </button>
          <dialog id={`my_modal_${id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{product.name}!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <button onClick={handleSubmit} className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};
