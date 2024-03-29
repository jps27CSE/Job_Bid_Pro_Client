import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../looties/loading.json";
import JobDetailsAnimation from "../looties/JobDetails.json";
import Lottie from "lottie-react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["get"],
    queryFn: async () => {
      const data = await axiosSecure.get(`/job_details/${id}`);
      return data.data;
    },
    initialData: {},
  });
  const isOwner = user?.email === data?.employer;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const biddingPrice = form.price.value;
    const deadline = form.deadline.value;
    const userEmail = user?.email;
    const buyerEmail = form.buyerEmail.value;

    const bidJob = {
      jobTitle: data?.job,
      biddingPrice,
      deadline,
      userEmail,
      buyerEmail,
      status: "pending",
    };

    axiosSecure.post("/bid_request", bidJob).then((res) => {
      if (res.status === 200) {
        toast("Successfully Bid Request");
        navigate("/my_bids");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>JobBidPro | Job Details</title>
      </Helmet>
      {isLoading ? (
        <Lottie className="mx-auto w-80" animationData={Loading} loop={true} />
      ) : (
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <Lottie
              className="mx-auto w-80"
              animationData={JobDetailsAnimation} // Update with the animation data from the job details
              loop={true}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data?.job}</h2>
            <p>
              <span className="font-bold">Deadline:</span> {data?.deadline}
            </p>
            <p>
              <span className="font-bold">Price Range:</span> {data?.minimum} -{" "}
              {data.maximum}
            </p>
            <p>
              <span className="font-bold">Description:</span>{" "}
              {data?.description}
            </p>
            <p>
              <span className="font-bold">Your Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-bold">Buyer Email:</span> {data?.employer}
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Price (your bidding amount)
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Your bid amount"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deadline</span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email </span>
                </label>
                <input
                  type="text"
                  name="email"
                  className="input input-bordered"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Buyer Email</span>
                </label>
                <input
                  type="text"
                  name="buyerEmail"
                  defaultValue={data.employer}
                  className="input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control mt-6">
                {isOwner ? (
                  <p>You are the owner of this job, so you cannot bid on it.</p>
                ) : (
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Bid on the project
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
