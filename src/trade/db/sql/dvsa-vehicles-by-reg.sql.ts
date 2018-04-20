export const sql = `SELECT TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(COALESCE(rfrloctype.lateral, ''),' ',
       COALESCE(rfrloctype.longitudinal, ''))), ' ',
       COALESCE(rfrloctype.vertical, ''))), ' ',
       COALESCE(timap.description, ''))),' ',
       CASE WHEN rfrtype.name = 'ADVISORY'
       THEN    COALESCE(rfrl.advisory_text, '')
       ELSE    COALESCE(rfrl.name, '')
       END)),' ',' ',
       COALESCE(rfrmapcomment.comment, ''))),
       CASE
       WHEN rfr.inspection_manual_reference IS NOT NULL THEN
       CONCAT(' (', rfr.inspection_manual_reference, ')') ELSE ' ' END)) rfr_and_comments,
       rfrtype.id rfr_id,
       rfrtype.name rfr_type,
       rfrmap.failure_dangerous is_rfr_dangerous,
       vehicle.registration,
       mtest.id mot_test_id,
       make.name make_name,
       model.name model_name,
       vehicle.id vehicle_id,
       vehicle.first_used_date,
       fuel_type.name fuel_type,
       colour1.name primary_colour,
       colour2.name secondary_colour,
       mtest.started_date,
       mtest.completed_date mot_test_completed_date,
       teststatus.name test_result,
       mtest.expiry_date,
       mtest.odometer_value odometer_value,
       mtest.odometer_unit odometer_unit,
       mtest.odometer_result_type odometer_result,
       mtest.number mot_test_number,
       s.name,
       a.address_line_1,
       a.address_line_2,
       a.town,
       a.postcode
       FROM vehicle
       JOIN model_detail on vehicle.model_detail_id = model_detail.id
       JOIN model on model_detail.model_id = model.id
       JOIN make on model.make_id = make.id
       JOIN mot_test_current mtest ON vehicle.id = mtest.vehicle_id
       LEFT JOIN mot_test_current_rfr_map rfrmap ON rfrmap.mot_test_id = mtest.id
       LEFT JOIN mot_test_rfr_map_comment rfrmapcomment ON rfrmapcomment.id = rfrmap.id
       LEFT JOIN reason_for_rejection_type rfrtype ON rfrtype.id = rfrmap.rfr_type_id
       LEFT JOIN mot_test_rfr_location_type rfrloctype ON rfrloctype.id = rfrmap.mot_test_rfr_location_type_id
       LEFT JOIN language_type l ON l.code = 'EN'
       LEFT JOIN reason_for_rejection rfr ON rfrmap.rfr_id = rfr.id
       LEFT JOIN rfr_language_content_map rfrl ON rfrl.rfr_id = rfr.id AND rfrl.language_type_id = l.id
       LEFT JOIN test_item_category ti ON rfr.test_item_category_id = ti.id
       LEFT JOIN ti_category_language_content_map timap ON timap.test_item_category_id = rfr.test_item_category_id AND timap.language_lookup_id = l.id
       LEFT JOIN colour_lookup colour2 ON colour2.id = vehicle.secondary_colour_id
       JOIN mot_test_status teststatus ON mtest.status_id = teststatus.id
       JOIN fuel_type ON model_detail.fuel_type_id = fuel_type.id
       JOIN colour_lookup colour1 ON vehicle.primary_colour_id = colour1.id
       JOIN mot_test_type test_type ON mtest.mot_test_type_id = test_type.id
       JOIN (SELECT registration, vin
             FROM vehicle
             JOIN mot_test_current on vehicle.id = mot_test_current.vehicle_id
             WHERE vehicle.registration = ?
             ORDER BY mot_test_current.completed_date desc
             LIMIT 1
             ) candidate_vehicles ON candidate_vehicles.vin = vehicle.vin AND
                                     candidate_vehicles.registration = vehicle.registration
       LEFT JOIN site s ON mtest.site_id = s.id
       LEFT JOIN site_contact_detail_map scdm ON s.id = scdm.site_id
       LEFT JOIN contact_detail cd ON scdm.contact_detail_id = cd.id
       LEFT JOIN address a ON cd.address_id = a.id
       WHERE (
                (teststatus.code = 'P' AND test_type.code IN ('NT','PL', 'PV', 'RT', 'EI', 'ES'))
                    OR
                (teststatus.code = 'F' AND test_type.code IN ('NT','PL', 'PV', 'RT'))
             )
       AND (scdm.site_contact_type_id = 2 OR scdm.site_contact_type_id is null)

UNION

SELECT TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(TRIM(CONCAT(COALESCE(rfrloctype.lateral, ''),' ',
       COALESCE(rfrloctype.longitudinal, ''))), ' ',
       COALESCE(rfrloctype.vertical, ''))), ' ',
       COALESCE(timap.description, ''))),' ',
       CASE WHEN rfrtype.name = 'ADVISORY'
       THEN    COALESCE(rfrl.advisory_text, '')
       ELSE    COALESCE(rfrl.name, '')
       END)),' ',' ',
       COALESCE(rfrmapcomment.comment, ''))),
       CASE
       WHEN rfr.inspection_manual_reference IS NOT NULL THEN
       CONCAT(' (', rfr.inspection_manual_reference, ')') ELSE ' ' END)) rfr_and_comments,
       rfrtype.id rfr_id,
       rfrtype.name rfr_type,
       rfrmap.failure_dangerous is_rfr_dangerous,
       vehicle.registration,
       mtest.id mot_test_id,
       make.name make_name,
       model.name model_name,
       vehicle.id vehicle_id,
       vehicle.first_used_date,
       fuel_type.name fuel_type,
       colour1.name primary_colour,
       colour2.name secondary_colour,
       mtest.started_date,
       mtest.completed_date mot_test_completed_date,
       teststatus.name test_result,
       mtest.expiry_date,
       mtest.odometer_value odometer_value,
       mtest.odometer_unit odometer_unit,
       mtest.odometer_result_type odometer_result,
       mtest.number mot_test_number,
       s.name,
       a.address_line_1,
       a.address_line_2,
       a.town,
       a.postcode
       FROM vehicle
       JOIN model_detail on vehicle.model_detail_id = model_detail.id
       JOIN model on model_detail.model_id = model.id
       JOIN make on model.make_id = make.id
       JOIN mot_test_history mtest ON vehicle.id = mtest.vehicle_id
       LEFT JOIN mot_test_history_rfr_map rfrmap ON rfrmap.mot_test_id = mtest.id
       LEFT JOIN mot_test_rfr_map_comment rfrmapcomment ON rfrmapcomment.id = rfrmap.id
       LEFT JOIN reason_for_rejection_type rfrtype ON rfrtype.id = rfrmap.rfr_type_id
       LEFT JOIN mot_test_rfr_location_type rfrloctype ON rfrloctype.id = rfrmap.mot_test_rfr_location_type_id
       LEFT JOIN language_type l ON l.code = 'EN'
       LEFT JOIN reason_for_rejection rfr ON rfrmap.rfr_id = rfr.id
       LEFT JOIN rfr_language_content_map rfrl ON rfrl.rfr_id = rfr.id AND rfrl.language_type_id = l.id
       LEFT JOIN test_item_category ti ON rfr.test_item_category_id = ti.id
       LEFT JOIN ti_category_language_content_map timap ON timap.test_item_category_id = rfr.test_item_category_id AND timap.language_lookup_id = l.id
       LEFT JOIN colour_lookup colour2 ON colour2.id = vehicle.secondary_colour_id
       JOIN mot_test_status teststatus ON mtest.status_id = teststatus.id
       JOIN fuel_type ON model_detail.fuel_type_id = fuel_type.id
       JOIN colour_lookup colour1 ON vehicle.primary_colour_id = colour1.id
       JOIN mot_test_type test_type ON mtest.mot_test_type_id = test_type.id
       JOIN ( SELECT completed_date, registration, vin
              FROM vehicle
              JOIN mot_test_current on vehicle.id = mot_test_current.vehicle_id
              WHERE vehicle.registration = ?
              UNION
              SELECT completed_date, registration, vin
              FROM vehicle
              JOIN mot_test_history on vehicle.id = mot_test_history.vehicle_id
              WHERE vehicle.registration = ?
              ORDER BY completed_date desc
              LIMIT 1
      ) candidate_vehicles ON candidate_vehicles.vin = vehicle.vin AND
                          candidate_vehicles.registration = vehicle.registration
     LEFT JOIN site s ON mtest.site_id = s.id
       LEFT JOIN site_contact_detail_map scdm ON s.id = scdm.site_id
       LEFT JOIN contact_detail cd ON scdm.contact_detail_id = cd.id
       LEFT JOIN address a ON cd.address_id = a.id
     WHERE (
              (teststatus.code = 'P' AND test_type.code IN ('NT','PL', 'PV', 'RT', 'EI', 'ES'))
                    OR
                (teststatus.code = 'F' AND test_type.code IN ('NT','PL', 'PV', 'RT'))
             )
       AND (scdm.site_contact_type_id = 2 OR scdm.site_contact_type_id is null)
ORDER BY vehicle_id ASC, mot_test_completed_date DESC, mot_test_id DESC ;`;
