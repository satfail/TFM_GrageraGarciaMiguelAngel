SELECT CONVERT (DAY (fecha_id) , CHAR)  as dayMod , max(a11.kpiValue) 
from mobCrossWalk_DWD_Tiempo mcwdt 
left join    peoARVR_DWH_InfluxControlDevice a11
	  on 	(DATE_FORMAT(fecha_id ,'%Y-%m-%d' ) = DATE_FORMAT(a11.dateModified,'%Y-%m-%d' ))
WHERE YEAR (fecha_id) = year(now())
group by  DAY (fecha_id), MONTH(fecha_id), year(fecha_id)
order by  MONTH(fecha_id),DAY (fecha_id);