$(document).ready(function() {
  const stateIDs = {}; // Object to store State IDs
  const cityIDs = {}; // Object to store City IDs

  $('input[name="state_checkbox"]').change(function() {
    const stateID = $(this).data('id'); // Get State ID from data-id attribute
    const stateName = $(this).data('name'); // Get State Name from data-name attribute

    if ($(this).prop('checked')) {
      stateIDs[stateID] = stateName; // Add State ID to object when checked
    } else {
      delete stateIDs[stateID]; // Remove State ID from object when unchecked
    }

    // Update h4 tag inside div Locations with list of checked States
    const statesList = Object.values(stateIDs).join(', ');
    $('.locations h4').text('States: ' + statesList);
  });

  $('input[name="city_checkbox"]').change(function() {
    const cityID = $(this).data('id'); // Get City ID from data-id attribute
    const cityName = $(this).data('name'); // Get City Name from data-name attribute

    if ($(this).prop('checked')) {
      cityIDs[cityID] = cityName; // Add City ID to object when checked
    } else {
      delete cityIDs[cityID]; // Remove City ID from object when unchecked
    }

    // Update h4 tag inside div Locations with list of checked Cities
    const citiesList = Object.values(cityIDs).join(', ');
    $('.locations h4').text('Cities: ' + citiesList);
  });

  $('button').click(function() {
    const amenityIDs = {}; // Object to store Amenity IDs

    // Fetch all checked Amenity IDs
    $('input[name="amenity_checkbox"]:checked').each(function() {
      const amenityID = $(this).data('id'); // Get Amenity ID from data-id attribute
      const amenityName = $(this).data('name'); // Get Amenity Name from data-name attribute
      amenityIDs[amenityID] = amenityName; // Add Amenity ID to object
    });

    // Construct the payload with Amenities, States, and Cities IDs
    const payload = {
      amenities: Object.keys(amenityIDs),
      states: Object.keys(stateIDs),
      cities: Object.keys(cityIDs)
    };

    // Send a POST request to places_search with the payload
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(payload),
      success: function(response) {
        console.log(response); // Handle the response as needed
      },
      error: function(xhr, status, error) {
        console.error(error); // Handle any errors
      }
    });
  });

  // Event listener for Reviews toggle
  $('h2:contains("Reviews") + span').click(function() {
    const $reviewsList = $('section.reviews');
    const $toggleSpan = $(this);

    if ($toggleSpan.text().trim() === 'hide') {
      $toggleSpan.text('show');
      $reviewsList.empty(); // Remove all Review elements from the DOM
    } else {
      // Fetch and display reviews
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/reviews',
        type: 'GET',
        success: function(response) {
          // Parse and display reviews
          response.forEach(function(review) {
            const $reviewElem = $('<div>').text(review.text);
            $reviewsList.append($reviewElem);
          });
          $toggleSpan.text('hide');
        },
        error: function(xhr, status, error) {
          console.error(error); // Handle any errors
        }
      });
    }
  });
});
