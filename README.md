# Amazon Scrape Products

  This program extracts data from the amazon uk website in a variable way, you can search any product and choose up to which page the data will be extracted, the extracted content is saved in a json file

# How to use

 - Up the server

    npm run dev

 - Go to (the first parameter is the product to be searched and the second to which page you want to extract the information)

    http://localhost:5000/read/headphone/2

- These are the information extracted from the products:

   title
   link
   image
   isSponsored
   price
   previousPrice
   rating
   numberOfReviews

