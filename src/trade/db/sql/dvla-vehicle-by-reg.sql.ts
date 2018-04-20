export const sql = `SELECT
  vehicle.id dvla_vehicle_id,
  vehicle.registration,
  vehicle.first_registration_date,
  vehicle.eu_classification,
  vehicle.body_type_code,
  ifnull(vehicle.make_in_full, ifnull(make.name,dvla_make.name)) make_name,
  if (vehicle.make_in_full is null, ifnull(model.name,dvla_model.name), '') model_name,
  colour1.name primary_colour,
  colour2.name secondary_colour,
  fuel_type.name fuel_type,
  if (vehicle.vehicle_id IS NULL,0,1) linked_vehicle
FROM dvla_vehicle vehicle
  JOIN dvla_model ON vehicle.model_code = dvla_model.code AND vehicle.make_code = dvla_model.make_code
  JOIN dvla_make ON vehicle.make_code = dvla_make.code
  JOIN fuel_type ON vehicle.propulsion_code = fuel_type.dvla_propulsion_code
  LEFT JOIN colour_lookup colour1 ON colour1.code = vehicle.colour_1_code
  LEFT JOIN colour_lookup colour2 ON colour2.code = vehicle.colour_2_code
  LEFT JOIN dvla_model_model_detail_code_map map ON map.dvla_make_code = vehicle.make_code AND map.dvla_model_code = vehicle.model_code
  LEFT JOIN model on map.model_id = model.id
  LEFT JOIN make on map.make_id = make.id AND model.make_id = make.id
WHERE vehicle.registration = ?
ORDER BY linked_vehicle ASC, vehicle.last_updated_on DESC
LIMIT 1;`;
