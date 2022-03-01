import { AiFillStar } from 'react-icons/ai';
import { IoIosBicycle } from "react-icons/io";
import { IoCarSport, IoFastFoodOutline, IoHelpOutline } from "react-icons/io5";

type AvailableIconProps = 'food' | 'car' | 'bicycle'

const availableIcons: { [field in AvailableIconProps | string]: any } = {
  food: { Icon: IoFastFoodOutline, title: 'Comida' },
  car: { Icon: IoCarSport, title: 'Carros' },
  bicycle: { Icon: IoIosBicycle, title: 'Bicicletas' },
  star: { Icon: AiFillStar, title: 'Estrelas' }
}

const getCategory = (icon: AvailableIconProps | string) => {
  if (!availableIcons[icon]) return { Icon: IoHelpOutline, title: 'Sem categoria' }
  return availableIcons[icon]
}

export { getCategory };
