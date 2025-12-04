import CloudIcon from '../../public/icons/cloud.svg';
import CloudIconWhite from '../../public/icons/cloud-white.svg';
import SnowIcon from '../../public/icons/cloud-snow.svg';
import SnowIconWhite from '../../public/icons/cloud-snow-white.svg';
import SunIcon from '../../public/icons/sunny.svg';
import SunIconWhite from '../../public/icons/sunny-white.svg';
import RainIcon from '../../public/icons/rain.svg';
import RainIconWhite from '../../public/icons/rain-white.svg';
import ClearIcon from '../../public/icons/cloudy-day.svg';
import ClearIconWhite from '../../public/icons/cloudy-day-white.svg';

const weatherIcons = {
  light: [
    { name: 'Clouds', src: CloudIcon, alt: 'Cloud icon' },
    { name: 'Rain', src: RainIcon, alt: 'Rain icon' },
    { name: 'Snow', src: SnowIcon, alt: 'Snow icon' },
    { name: 'Sun', src: SunIcon, alt: 'Sun icon' },
    { name: 'Clear', src: ClearIcon, alt: 'Clear weather icon' },
  ],

  dark: [
    { name: 'Clouds', src: CloudIconWhite, alt: 'Cloud icon' },
    { name: 'Rain', src: RainIconWhite, alt: 'Rain icon' },
    { name: 'Snow', src: SnowIconWhite, alt: 'Snow icon' },
    { name: 'Sun', src: SunIconWhite, alt: 'Sun icon' },
    { name: 'Clear', src: ClearIconWhite, alt: 'Clear weather icon' },
  ],
};

export { weatherIcons };
