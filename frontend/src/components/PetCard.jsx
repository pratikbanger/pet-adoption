import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
    return (
        <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
            <img
                src={pet.photoUrl || "https://via.placeholder.com/300"}
                alt={pet.name}
                className="w-full h-48 object-cover rounded"
            />

            <div className="mt-3">
                <h3 className="text-lg font-semibold">{pet.name}</h3>
                <p className="text-sm text-gray-600">
                    {pet.species} • {pet.breed}
                </p>
                <p className="text-sm text-gray-500">Age: {pet.age}</p>

                <Link
                    to={`/pets/${pet.id}`}
                    className="inline-block mt-3 text-blue-600 hover:underline"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PetCard;
