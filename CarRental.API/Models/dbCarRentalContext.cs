using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CarRental.API.Models
{
    public partial class dbCarRentalContext : DbContext
    {
        public dbCarRentalContext()
        {
        }

        public dbCarRentalContext(DbContextOptions<dbCarRentalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<Car> Car { get; set; }
        public virtual DbSet<CarUpload> CarUpload { get; set; }
        public virtual DbSet<FuelType> FuelType { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Model> Model { get; set; }
        public virtual DbSet<PreBooking> PreBooking { get; set; }
        public virtual DbSet<TransmisionType> TransmisionType { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.ProviderKey).HasMaxLength(128);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.FirstName).HasMaxLength(250);

                entity.Property(e => e.LastName).HasMaxLength(250);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.Name).HasMaxLength(128);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.CreateByUserId).HasMaxLength(450);

                entity.Property(e => e.CreateOnDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LastModifiedByUserId).HasMaxLength(450);

                entity.Property(e => e.LastModifiedOnDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasMaxLength(450);

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.CarId)
                    .HasConstraintName("FK_Booking_Car");

                entity.HasOne(d => d.PreBooking)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.PreBookingId)
                    .HasConstraintName("FK_Booking_PreBooking");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Booking_AspNetUsers");
            });

            modelBuilder.Entity<Car>(entity =>
            {
                entity.Property(e => e.CarColor).HasMaxLength(200);

                entity.Property(e => e.CarNumber).HasMaxLength(200);

                entity.Property(e => e.CreateByUserId).HasMaxLength(450);

                entity.Property(e => e.CreateOnDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LastModifiedByUserId).HasMaxLength(450);

                entity.Property(e => e.LastModifiedOnDate).HasColumnType("datetime");

                entity.Property(e => e.ModelYear).HasMaxLength(100);

                entity.Property(e => e.PriceForDay).HasColumnType("decimal(18, 4)");

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.BrandId)
                    .HasConstraintName("FK_Car_Brand");

                entity.HasOne(d => d.CarLocation)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.CarLocationId)
                    .HasConstraintName("FK_Car_Location");

                entity.HasOne(d => d.FuelType)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.FuelTypeId)
                    .HasConstraintName("FK_Car_FuelType");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.ModelId)
                    .HasConstraintName("FK_Car_Model");

                entity.HasOne(d => d.TransmisionType)
                    .WithMany(p => p.Car)
                    .HasForeignKey(d => d.TransmisionTypeId)
                    .HasConstraintName("FK_Car_TransmisionType");
            });

            modelBuilder.Entity<CarUpload>(entity =>
            {
                entity.HasOne(d => d.Car)
                    .WithMany(p => p.CarUpload)
                    .HasForeignKey(d => d.CarId)
                    .HasConstraintName("FK_CarUpload_Car");
            });

            modelBuilder.Entity<PreBooking>(entity =>
            {
                entity.Property(e => e.CreateByUserId).HasMaxLength(450);

                entity.Property(e => e.CreateOnDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LastModifiedByUserId).HasMaxLength(450);

                entity.Property(e => e.LastModifiedOnDate).HasColumnType("datetime");

                entity.Property(e => e.PickDate).HasColumnType("datetime");

                entity.Property(e => e.ReturnDate).HasColumnType("datetime");

                entity.HasOne(d => d.PickLocation)
                    .WithMany(p => p.PreBookingPickLocation)
                    .HasForeignKey(d => d.PickLocationId)
                    .HasConstraintName("FK_PreBooking_Location");

                entity.HasOne(d => d.ReturnLocation)
                    .WithMany(p => p.PreBookingReturnLocation)
                    .HasForeignKey(d => d.ReturnLocationId)
                    .HasConstraintName("FK_PreBooking_Location1");
            });
        }
    }
}
