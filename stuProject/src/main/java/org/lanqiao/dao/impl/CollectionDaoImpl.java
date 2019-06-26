package org.lanqiao.dao.impl;

import org.lanqiao.dao.BaseDao;
import org.lanqiao.dao.CollectionDao;
import org.lanqiao.entity.Caipu;
import org.lanqiao.entity.Collection;

import java.util.List;

public class CollectionDaoImpl extends BaseDao<Caipu> implements CollectionDao {
    @Override
    public List<Caipu> showCollection(Caipu c) {
        return executeQuery("SELECT c_id,c_image,c_name,c_made,c_introduce FROM Caipu WHERE c_id in(SELECT c_id from Collection WHERE u_id = ?)",
                new Object[]{c.getU_id()});
    }
    public int getCollectionCount(){
        return  getRecordCount("SELECT COUNT(*) FROM  Collection WHERE u_id = 2");
    }

    @Override
    public int addCollection(Collection c) {
        return executeUpdate("insert into Collection(u_id,c_id) values(?,?)",new Object[]{c.getU_id(),c.getC_id()});    }

    @Override
    public int deleteCollection(Collection collection) {
        return executeUpdate("DELETE FROM Collection WHERE u_id = 2 and c_id =?",new Object[]{collection.getC_id()});    }


}
