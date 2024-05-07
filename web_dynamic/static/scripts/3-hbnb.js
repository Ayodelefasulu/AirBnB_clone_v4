$(document).ready(function() {
  const amenityIDs = {}; // Object to store Amenity IDs

  $('input[name="amenity_checkbox"]').change(function() {
    const amenityID = $(this).data('id'); // Get Amenity ID from data-id attribute
    const amenityName = $(this).data('name'); // Get Amenity Name from data-name attribute

    if ($(this).prop('checked')) {
      amenityIDs[amenityID] = amenityName; // Add Amenity ID to object when checked
    } else {
      delete amenityIDs[amenityID]; // Remove Amenity ID from object when unchecked
    }

    // Update h4 tag inside div Amenities with list of checked Amenities
    const amenitiesList = Object.values(amenityIDs).join(', ');
    $('.amenities h4').text('Amenities: ' + amenitiesList);
  });

  // AJAX request to check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available'); // Add class available to div#api_status
    } else {
      $('#api_status').removeClass('available'); // Remove class available from div#api_status
    }
  });

  // AJAX request to fetch places data
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}), // Empty dictionary as POST data
    success: function(data) {
      data.forEach(function(place) {
        const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;
        $('.places').append(article); // Append the created article to section.places
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('Error fetching places:', textStatus, errorThrown);
    }
  });
});
