import Image from "next/image";
const Location = () => {
  return (
    <div>
      <Image src="/hero/location.svg" alt="Location" width={100} height={100} />
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Art of Living, Umm Suqeim St, Dubai
      </a>
    </div>
  );
};

export default Location;
