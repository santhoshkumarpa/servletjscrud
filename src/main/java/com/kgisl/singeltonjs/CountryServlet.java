package com.kgisl.singeltonjs;

// import java.io.IOExc1eption;
import java.io.IOException;
// import java.sql.Connection;
// import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

// import javax.servlet.ServletExc1eption;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * CountryServlet
 */
@WebServlet("/country")
public class CountryServlet extends HttpServlet {
    ArrayList<Country> countryList = new ArrayList<Country>();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String sql = "select * from datas";
        try {
            List<Object> list = MySqlConnect.getDbCon().resultSetToArrayList(sql);
            if (list == null) {

            } else {
                System.out.println("ShowForm connected....!!!!");
                List<Country> countryList = (List<Country>) (List<?>) list;

                System.out.println("ArrayList Add!!!");
                String countryJsonString = new Gson().toJson(countryList);
                System.out.println(countryJsonString);

                resp.setContentType("application/json");
                resp.setCharacterEncoding("UTF-8");
                resp.getWriter().write(countryJsonString);

            }
        } catch (Exception e) {
            System.out.println(e);
        }

        // Country c = new Country();
        // c.setId(1);
        // c.setName("santhosh");
        // countryList.add(c);
        // Country c1 = new Country();
        // c1.setId(2);
        // c1.setName("siva");
        // countryList.add(c1);
        // Gson gson = new Gson();
        // String countryJsonString = gson.toJson(countryList);

        // resp.setContentType("application/json");
        // resp.setCharacterEncoding("UTF-8");
        // resp.getWriter().write(countryJsonString);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        String name = req.getParameter("name");
        System.out.println("dopost");

        String sql = "insert into datas(id,name)values(" + id + ",'" + name + "')";

        try {
            int i = MySqlConnect.getDbCon().insert(sql);
            System.out.println("number of data added :" + i);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        String name = req.getParameter("name");

        System.out.println("doput");
        System.out.println(id);
        System.out.println(name);

        String sql = "update datas set id=" + id + ",name='" + name + "'where id=" + id;
        try {
            int i = MySqlConnect.getDbCon().insert(sql);
            System.out.println("number of row updated" + i);

        } catch (Exception e) {
            System.out.println(e);
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("delete method called");
        int id = Integer.parseInt(req.getParameter("id"));
        System.out.println("the delete id : " + id);
        String sql = "delete from datas where id=" + id;
        try {
            int a = MySqlConnect.getDbCon().delete(sql);
            System.out.println("delete rows :" + a);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

}