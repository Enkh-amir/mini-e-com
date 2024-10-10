export const Card = ({ product, handleSubmit }) => {
  const { id, name, description, price, image_url } = product;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img className="object-cover" src={image_url} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}!</h2>
        <p>{description}</p>
        <p>${price}</p>
        <div className="card-actions justify-end">
          <a href={`#${product.id}`} className="btn">
            more
          </a>

          <div className="modal" role="dialog" id={`${product.id}`}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">{product.name}!</h3>
              <p className="py-4">This modal works with anchor links</p>
              <div className="modal-action">
                <a href="#" className="btn">
                  Yay!
                </a>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
