import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function usePreviousLocation() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(null);
  const locationRef = useRef(location);

  useEffect(() => {
    // Update previous location when location changes
    setPrevLocation(locationRef.current);
    locationRef.current = location;
  }, [location]);

  return prevLocation;
}

export default usePreviousLocation;
