import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import EditAnimation from "../../looties/Edit.json";
import Lottie from "lottie-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const EditJobs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get(`https://b8a11-server-side-jps27-cse.vercel.app/job_details/${id}`, {
        withCredentials: true,
      })
      .then((item) => setData(item.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const employer = user?.email;
    const job = form.job.value;
    const deadline = form.deadline.value;
    const description = form.description.value;
    const category = selectedCategory ? selectedCategory : data?.category;
    const minimum = form.minimum.value;
    const maximum = form.maximum.value;

    const updateJob = {
      employer,
      job,
      deadline,
      description,
      category,
      minimum,
      maximum,
    };

    axios
      .put(`https://b8a11-server-side-jps27-cse.vercel.app/edit_job/${id}`, {
        updateJob,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Updated Successfully");
          navigate("/");
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
        <title>JobBidPro | Edit Job</title>
      </Helmet>
      <div>
        <div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-5 mb-2">
              Edit Job
            </h1>
          </div>
          <div className="hero   mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <Lottie
                  className="mx-auto w-80"
                  animationData={EditAnimation}
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
                      defaultValue={data?.job}
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
                      defaultValue={data?.deadline}
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
                      defaultValue={data?.description}
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
                          <a onClick={handleCategorySelect}>
                            Digital Marketing
                          </a>
                        </li>
                        <li>
                          <a onClick={handleCategorySelect}>Graphics Design</a>
                        </li>
                      </ul>
                    </div>
                    <input
                      type="text"
                      name="selectedCategory"
                      defaultValue={data?.category}
                      value={selectedCategory}
                      className="input input-bordered"
                      readOnly
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Minimum Price</span>
                    </label>
                    <input
                      type="number"
                      name="minimum"
                      defaultValue={data?.minimum}
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
                      defaultValue={data?.maximum}
                      placeholder="Maximum Price"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Update Job</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobs;
