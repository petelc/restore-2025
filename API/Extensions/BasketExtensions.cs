using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.Product.Id,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Brand = item.Product.Brand,
                Type = item.Product.Type,
                Quantity = item.Quantity
            }).ToList()
        };
    }
}
