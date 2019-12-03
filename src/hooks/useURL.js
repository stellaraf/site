import { useState } from "react";

export default function useURL() {
    const [location, setLocation] = useState({
        host: window.location.host,
        pathname: window.location.pathname,
        protocol: window.location.protocol
    });
    return [location, setLocation];
}
