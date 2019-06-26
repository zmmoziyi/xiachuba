package org.lanqiao.servlet;

import org.lanqiao.dao.impl.PinglunDaoImpl;
import org.lanqiao.entity.Pinglun;
import org.lanqiao.entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/addPinglunServlet")
public class addPinglunServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String p_content=request.getParameter("p_content");//评论内容
//        String u_id=request.getParameter("u_id");//当前用户id
        String d_id=request.getParameter("d_id");//评论的动态

        User u=(User)request.getSession().getAttribute("sessionkey");
        int u_id=u.getU_id();

        System.out.println("p_content "+p_content);
        System.out.println("d_id "+d_id);

        //封装
        Pinglun pl=new Pinglun();
        pl.setP_content(p_content);
        pl.setD_id(Integer.parseInt(d_id));
        pl.setU_id(u_id);


        PinglunDaoImpl pld=new PinglunDaoImpl();
        int i= pld.addPinglun(pl);

        response.getWriter().print(i);


    }
}
