import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { _id } = category;

    return (
        <Link to={`/category/${_id}`}>
            <div className="card w-60 h-32 shadow-xl image-full">
                <figure><img className='w-full' src={category.picture} alt="Shoes" /></figure>
                <div className="card-body flex items-center justify-center">
                    <h2 className="card-title text-white hover:text-primary underline">{category?.name}</h2>
                </div>
            </div>
        </Link>
    );
};

export default Category;