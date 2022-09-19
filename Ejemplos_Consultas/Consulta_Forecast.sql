    (SELECT erap.entityId as entityId ,
           DATE_FORMAT( erap.recvTime , '%Y/%m/%d %H:%i') dateModified ,
           ROUND( avg(erap.predicted_mean),2) as airQualityIndex,
           er.description as description,
	       'Forecast' as nameType
	FROM EAQR_pmi_dwh_AQForecast erap
	left join (SELECT entityId ,description 
					from EAQR__R er
					group by entityId , description ) as er
	    on er.entityId = erap.entityId
	where erap.entityId = ${entityRespira}
	and erap.recvTime is not null
	GROUP BY erap.entityId , DATE_FORMAT( erap.recvTime , '%Y/%m/%d %H:%i'), er.description  
	order by 2 desc limit 31)
UNION
	(SELECT 
		entityId,
		DATE_FORMAT( dateModified , '%Y/%m/%d %H:00') dateModified ,
		ROUND( avg(airQualityIndex),2) as airQualityIndex,
		description as description,
		'Respira' as nameType
	from EAQR__R er2
	where entityId = ${entityRespira} 
	group by entityId, DATE_FORMAT( dateModified , '%Y/%m/%d %H:00'), description 
	order by 2 desc limit 8)
order by 2 asc;
