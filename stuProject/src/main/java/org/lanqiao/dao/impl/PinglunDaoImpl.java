package org.lanqiao.dao.impl;

import org.lanqiao.dao.BaseDao;
import org.lanqiao.dao.PinglunDao;
import org.lanqiao.entity.Pinglun;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class PinglunDaoImpl extends BaseDao<Pinglun> implements PinglunDao {
    @Override
    public int addPinglun(Pinglun pl) {
        return executeUpdate("insert into Pinglun(p_content,u_id,d_id) values(?,?,?)", new Object[]{pl.getP_content(),pl.getU_id(),pl.getD_id()});
    }
//    @Override
//    public List<Pinglun> findPinglun(Pinglun pl) {
//        String sql="select * from Pinglun where 1=1";
//        List<Object> list =new ArrayList<Object>();
//
//        if(pl.getU_id()!=0){
//            sql+=" and u_id=? ";
//            list.add(pl.getU_id());
//        }
//        if(pl.getD_id()!=0){
//            sql+=" and d_id=? ";
//            list.add(pl.getD_id());
//        }
//        if (pl.getP_time()!=null && pl.getP_content()!=""){
//            String sdate=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(pl.getP_time());
//            sql+=" and p_time=? ";
//            list.add(sdate);
//        }
//        return executeQuery(sql,list.toArray());
//    }

    @Override
    public List<Pinglun> findPinglun(Pinglun pl) {
        return null;
    }
}
