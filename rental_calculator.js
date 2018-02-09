import Customer from "./customer";
import Rental from "./rental";


function statement(customer, movies) {
  const c = new Customer({ name: customer.name });
  const rentals = customer.rentals.map(
    rental => new Rental({ movie: movies[rental.movieID], days: rental.days })
  );
  let totalAmount = 0;
  let result = `Rental Record for ${c.name}\n`;
  for (let r of rentals) {
    let thisAmount = r.getBill();

    //add frequent renter points
    c.incrementRentalPoints();
    // add bonus for a two day new release rental
    if (r.movie.code === "new" && r.days > 2) c.incrementRentalPoints();

    //print figures for this rental
    result += `\t${r.movie.title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${c.frequentRenterPoints} frequent renter points\n`;

  return result;
}

export { statement };
