export let store = [
  {name:'apples', category: 1},
  {name:'pears', category: 1},
  {name:'berries', category: 1},
  {name:'corn', category: 1},
  {name:'lettuce', category: 1},
  {name:'bacon', category: 2},
  {name:'ground beef', category: 2},
  {name:'sourdough bread', category: 4},
  {name:'muffins', category: 4},
  {name:'ice cream', category: 3},
  {name:'milk', category: 3},
  {name:'cheddar cheese', category: 3},
  {name:'cream cheese', category: 3},
  {name:'mop', category: 5},
  {name:'ziplock bags', category: 5},
]

export let categoryLookup = {
  1: 'Produce',
  2: 'Meat',
  3: 'Dairy',
  4: 'Bakery',
  5: 'Housewares'
}

export const list = [
  {name: 'lettuce', quantity: '3 heads', category: 1, active: true},
  {name: 'cream cheese', quantity: '1 - 8 oz.package', category: 2,active: true},
  {name: 'milk', quantity: '1 quart', category: 2, active: false},
  {name: 'mop', quantity: '1', category: 6, active: false}
]