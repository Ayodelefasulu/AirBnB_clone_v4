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
});
