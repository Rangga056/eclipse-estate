import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Pagination]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();

        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();

        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();

        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col gap-6 p-24 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl capitalize">
          Find your next <span className="light-green-text">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-500 text-sm sm:text-base">
          Eclipse Estate is the best place to find your next perfectp place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"}>
          <button className="text-white light-green-bg font-bold text-xl py-3 px-5 rounded-full hover:shadow-lg hover:opacity-95">
            Get Started
          </button>
        </Link>
      </div>
      {/* Swiper Slider */}
      <Swiper
        pagination
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[520px] cursor-move"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Listings */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-base light-green-text hover:underline"
              >
                See more offers
              </Link>
            </div>

            <div className="flex flex-wrap justify-between gap-y-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold">
                Recent Placest For Rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-base light-green-text hover:underline"
              >
                See more places forrent
              </Link>
            </div>

            <div className="flex flex-wrap justify-between gap-y-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold">
                Recent Sales
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-base light-green-text hover:underline"
              >
                See more sales
              </Link>
            </div>

            <div className="flex flex-wrap justify-between gap-y-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
