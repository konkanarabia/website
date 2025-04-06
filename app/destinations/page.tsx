import OurServices from "../components/services";

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Holiday Packages</h1>
      <p className="text-lg text-center mt-4">
        Explore our curated holiday packages designed to offer you the best
        travel experiences. Whether you're looking for a relaxing beach getaway,
        an adventurous mountain retreat, or a cultural city tour, we have
        something for everyone.
      </p>
      <OurServices />
    </div>
  );
}
