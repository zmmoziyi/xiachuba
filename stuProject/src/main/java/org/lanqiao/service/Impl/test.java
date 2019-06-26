package org.lanqiao.service.Impl;

public class test {
    public static void main(String[] args) {
        String sql = "update User set u_name=?u_sex=?u_hometown=? where u_id = ?";
        String sql1 = sql.replaceAll("\\?","?,");
        String sql2 = sql1.substring(0,sql1.length()-1);
        int index = sql2.lastIndexOf("?,");
        String sql3 = sql2.substring(0,index+1) +sql2.substring(index+2);
        System.out.println(sql3);
    }
}
