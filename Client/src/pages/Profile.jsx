import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FaEyeSlash, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

function SignUp() {
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUpErr, setFileUpErr] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setshowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUpErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setshowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === "false") {
        setshowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setshowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-9 md:text-4xl">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          ref={fileRef}
          className="hidden"
          accept="iamge/*"
        />
        <img
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-0"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUpErr ? (
            <span className="text-red-700">
              Error on image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="light-green-text">Successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          autoComplete="off"
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="username"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="email@gmail.com"
          autoComplete="off"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="email"
          defaultValue={currentUser.email}
        />
        <div className="flex flex-1 relative">
          <input
            type={passwordType}
            placeholder="password"
            autoComplete="off"
            className="border p-3 rounded-lg relative w-full"
            onChange={handleChange}
            id="password"
          />

          <span
            disabled={false}
            className="bg-transparent text-slate-700 text-xl p-3 rounded-lg uppercase w-10 absolute right-1 top-1 cursor-pointer"
            onClick={togglePassword}
          >
            {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button
          disabled={loading}
          className="light-green-bg text-white text-lg p-3 rounded-lg uppercase hover:opacity-95 hover:shadow-lg transition-shadow disabled:opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-slate-700 text-white text-center text-lg p-3 rounded-lg uppercase hover:opacity-95 hover:shadow-lg transition-shadow"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-3">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>

      <p className="text-red-700 mt-4">{error ? error : ""}</p>
      <p className="light-green-text mt-3">
        {updateSuccess ? "User is updated Successfully" : ""}
      </p>

      <button onClick={handleShowListing} className="light-green-text w-full">
        Show Listings
      </button>
      <p className="text-red text-sm">
        {showListingError ? "Error showing listings" : ""}
      </p>
      {userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`} className="">
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
              >
                <p className="truncate">{listing.name}</p>
              </Link>
              <div className="flex items-center gap-2">
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="light-green-text text-[22px] p-1 rounded-lg uppercase transition duration-200 ease-in-out hover:scale-110 flex items-center">
                    <FaEdit/>
                  </button>
                </Link>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 text-[22px] p-1 rounded-lg uppercase transition duration-200 ease-in-out hover:scale-110 flex items-center"
                >
                  <FaTrash/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SignUp;
