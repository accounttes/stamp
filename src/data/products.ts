export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Эспрессо',
    description: 'Классический итальянский кофе с насыщенным вкусом',
    price: 150,
    image: 'https://galaktika29.ru/upload/iblock/db6/k0ta8ki954k0l5qrh3rt4214nfa40rep.jpg'
  },
  {
    id: 2,
    name: 'Капучино',
    description: 'Эспрессо с молоком и молочной пенкой',
    price: 200,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Латте',
    description: 'Эспрессо с большим количеством молока и тонким слоем пены',
    price: 220,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Американо',
    description: 'Эспрессо, разбавленный горячей водой',
    price: 180,
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    name: 'Моккачино',
    description: 'Эспрессо с шоколадом и молоком',
    price: 230,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    name: 'Флэт Уайт',
    description: 'Эспрессо с молоком без пены',
    price: 190,
    image: 'https://coffeepedia.ru/wp-content/uploads/2015/04/flw.png'
  }
]; 