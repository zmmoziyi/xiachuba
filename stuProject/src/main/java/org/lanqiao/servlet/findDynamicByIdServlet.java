package org.lanqiao.servlet;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.lanqiao.dao.impl.DynamicDaoImpl;
import org.lanqiao.entity.Dynamic;
import org.lanqiao.util.JsonDateValueProcessor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

@WebServlet("/findDynamicByIdServlet")
public class findDynamicByIdServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        Dynamic d = new Dynamic();
        d.setD_id(Integer.parseInt(id));

        DynamicDaoImpl dynamicDao = new DynamicDaoImpl();
        List<Dynamic> list = dynamicDao.findUserById(d);

        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class , new JsonDateValueProcessor());

        JSONArray jsonArray = JSONArray.fromObject(list,jsonConfig);

        PrintWriter out = response.getWriter();
        out.print(jsonArray.toString());
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            doPost(request,response);
    }
}
