import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API;

type Props = {
  borders: object[];
};

export default function MapCard(props: Props) {
  // const [markerRef, marker] = useMarkerRef();

  // useEffect(() => {
  //   if (!marker) {
  //     return;
  //   }

  //   console.log("marker ref is", marker);

  //   // do something with marker instance here
  // }, [marker]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Map of Romania</CardTitle>
        <CardDescription>Showing all borders</CardDescription>
      </CardHeader>
      <CardContent>
        <APIProvider apiKey={mapsKey}>
          <Map
            style={{ width: "auto", height: "50vh" }}
            defaultCenter={{ lat: 45.9432, lng: 24.9668 }}
            defaultZoom={6}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {props.borders
              ?.filter((border) => border.hasOwnProperty("latitude"))
              .map((border: any) => (
                <Marker
                  position={{ lat: border.latitude, lng: border.longitude }}
                />
              ))}
          </Map>
        </APIProvider>
      </CardContent>
    </Card>
  );
}
