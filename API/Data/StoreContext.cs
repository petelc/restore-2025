using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Data;

public class StoreContext(DbContextOptions<StoreContext> options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    override protected void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);


        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "ae20aea4-360c-44a1-a9c6-e2810bd3b992", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id = "c5287d49-a3db-4999-8d5c-ee4f4334acf0", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
