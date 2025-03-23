import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              KonkanArabia is a combine word with the name of two different
              Places in the world map. One is Konkan from Konkan Region of
              Maharashtra India & second is Arabia from the Gulf country United
              Arab Emirates. And it's not just a word but a complete reflection
              of a journey from one nation to another nation in search of new
              business opportunities. And its journey of business progress from
              one country to another country.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The responsibility to encourage, promote, and develop tourism as a
              major socioeconomic activity to generate foreign currency and
              employment and to spread the benefits of tourism to both the
              private and public sector.
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Why Choose Us</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Expertly curated travel experiences</li>
              <li>24/7 customer support</li>
              <li>Competitive prices and flexible booking options</li>
              <li>Sustainable and responsible travel practices</li>
              <li>Local insights and authentic experiences</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
