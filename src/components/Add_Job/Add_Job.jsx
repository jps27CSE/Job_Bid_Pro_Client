import { useContext, useState } from "react";
import AddJobAnimation from "../looties/add_job.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Add_Job = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const employer = user?.email;
    const job = form.job.value;
    const deadline = form.deadline.value;
    const description = form.description.value;
    const category = selectedCategory;
    const minimum = form.minimum.value;
    const maximum = form.maximum.value;

    const newJob = {
      employer,
      job,
      deadline,
      description,
      category,
      minimum,
      maximum,
    };

    axiosSecure.post("/add_job", newJob).then((res) => {
      if (res.status === 200) {
        toast("Job Added Successfully");
        navigate("/my_posted_jobs");
      }
    });

    form.reset();
  };

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.innerText);
  };

  return (
    <div>
      <Helmet>
        <title>JobBidPro | Add Jobs</title>
      </Helmet>
      <div>
        <div>
          <h1 className="text-4xl font-bold text-center mt-5 mb-2">Add Job</h1>
        </div>
        <div className="hero   mx-auto">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <Lottie
                className="mx-auto w-80"
                animationData={AddJobAnimation}
                loop={true}
              />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email of the employer</span>
                  </label>
                  <input
                    type="text"
                    name="employer"
                    defaultValue={user?.email}
                    className="input input-bordered"
                    disabled
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job Title</span>
                  </label>
                  <input
                    type="text"
                    name="job"
                    placeholder="Job Title"
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
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select Category</span>
                  </label>
                  <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn m-1">
                      Category
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={handleCategorySelect}>Web Development</a>
                      </li>
                      <li>
                        <a onClick={handleCategorySelect}>Digital Marketing</a>
                      </li>
                      <li>
                        <a onClick={handleCategorySelect}>Graphics Design</a>
                      </li>
                    </ul>
                  </div>
                  <input
                    type="text"
                    name="selectedCategory"
                    value={selectedCategory}
                    className="input input-bordered"
                    disabled
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Minimum Price</span>
                  </label>
                  <input
                    type="number"
                    name="minimum"
                    placeholder="Minimum Price"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Maximum Price</span>
                  </label>
                  <input
                    type="number"
                    name="maximum"
                    placeholder="Maximum Price"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Add Job</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Job;
